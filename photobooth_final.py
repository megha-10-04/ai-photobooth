import cv2
import os
import time
import numpy as np
import mediapipe as mp
from playsound import playsound
os.makedirs("photos", exist_ok=True)

print("✅ PRO Photobooth Started")

# =========================
# SETTINGS
# =========================
COUNTDOWN_SECONDS = 3
BASE_SMOOTHING = 0.80
FAST_SMOOTHING = 0.60

# =========================
# EVENT TITLE
# =========================
EVENT_TITLE = input("Enter event title text: ").strip()
SHOW_TIMESTAMP = True  # ⭐ default ON

# =========================
# PHOTOSTRIP SETUP
# =========================
print("\n📸 Photostrip Setup")
STRIP_COUNT = int(input("How many photos in strip? (1 = normal photo): "))
STRIP_COUNT = max(1, STRIP_COUNT)
STRIP_MODE = STRIP_COUNT > 1
STRIP_DELAY = 2.0

# =========================
# USER FOLDER
# =========================
person_name = input("Enter your name: ").strip().lower()
save_folder = os.path.join("photos", person_name)
os.makedirs(save_folder, exist_ok=True)
print("📁 Photos will be saved in:", save_folder)

# =========================
# LOAD PNG
# =========================
def load_png(path):
    img = cv2.imread(path, cv2.IMREAD_UNCHANGED)
    if img is None:
        print(f"❌ NOT FOUND: {path}")
        exit()
    if img.shape[2] != 4:
        print(f"❌ PNG must have transparency: {path}")
        exit()
    return img

glasses_img = load_png("filters/glasses.png")
crown_img = load_png("filters/crown.png")
mustache_img = load_png("filters/mustache.png")
frame_img = load_png("assets/event_frame.png")

# =========================
# HELPERS
# =========================
def rotate_png(png, angle):
    h, w = png.shape[:2]
    M = cv2.getRotationMatrix2D((w//2, h//2), angle, 1.0)
    return cv2.warpAffine(
        png, M, (w, h),
        flags=cv2.INTER_LINEAR,
        borderMode=cv2.BORDER_CONSTANT,
        borderValue=(0,0,0,0)
    )

def overlay_png(frame, png, x, y):
    ph, pw = png.shape[:2]
    if x < 0 or y < 0 or x+pw > frame.shape[1] or y+ph > frame.shape[0]:
        return
    alpha = png[:, :, 3] / 255.0
    for c in range(3):
        frame[y:y+ph, x:x+pw, c] = (
            alpha * png[:, :, c] +
            (1 - alpha) * frame[y:y+ph, x:x+pw, c]
        )

def overlay_fullscreen(frame, png):
    h, w = frame.shape[:2]
    resized = cv2.resize(png, (w, h))
    overlay_png(frame, resized, 0, 0)

def draw_event_text(frame):
    h, w = frame.shape[:2]

    if EVENT_TITLE != "" and SHOW_EVENT_TITLE:
        size = cv2.getTextSize(
            EVENT_TITLE,
            cv2.FONT_HERSHEY_SIMPLEX,
            1.0, 2
        )[0]

        x = (w - size[0]) // 2
        cv2.putText(frame, EVENT_TITLE,
                    (x, 50),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    1.0, (0,215,255), 3, cv2.LINE_AA)

    if SHOW_TIMESTAMP:
        ts = time.strftime("%d %b %Y  %I:%M:%S %p")
        (tw, th), _ = cv2.getTextSize(
            ts,
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6, 2
        )
        cv2.putText(
            frame,
            ts,
            (w - tw - 20, h - 20),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6,
            (255,255,255),
            2,
            cv2.LINE_AA
        )


# =========================
# MEDIAPIPE
# =========================
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(max_num_faces=5, refine_landmarks=True)

mp_hands = mp.solutions.hands
hands = mp_hands.Hands(max_num_hands=2)

# =========================
# CAMERA
# =========================
cap = cv2.VideoCapture(0)

# =========================
# STATE
# =========================
capture_pending = False
capture_start_time = 0
current_filter = 1
frame_enabled = False

gesture_active = False
gesture_start_time = 0
GESTURE_HOLD_TIME = 1.5
trigger_armed = False

SHOW_EVENT_TITLE = True
strip_images = []
gesture_progress = 0.0
capture_cooldown = 0
COOLDOWN_TIME = 2
space_held = False

print("\n🎮 Controls:")
print("1 = glasses")
print("2 = crown")
print("3 = mustache")
print("4 = frame toggle")
print("5 = no filter")
print("6 = strip mode toggle")
print("7 = timestamp ON")
print("8 = timestamp OFF")
print("9 = event title ON/OFF")
print("SPACE or raise hand = hold to capture\n")

# =========================
# MAIN LOOP
# =========================
while True:
    ret, frame = cap.read()
    if not ret:
        break

    frame = cv2.flip(frame, 1)
    preview = frame.copy()
    clean = frame.copy()

    h, w = frame.shape[:2]
    rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

    face_results = face_mesh.process(rgb)
    hand_results = hands.process(rgb)

    key = cv2.waitKey(10) & 0xFF
    now = time.time()

    if key == ord('1'):
        current_filter = 1
    elif key == ord('2'):
        current_filter = 2
    elif key == ord('3'):
        current_filter = 3
    elif key == ord('5'):
        current_filter = 0
    elif key == ord('4'):
        frame_enabled = not frame_enabled
    elif key == ord('6'):
        STRIP_MODE = not STRIP_MODE
        print("🎞️ Strip mode:", STRIP_MODE)
    elif key == ord('7'):
        SHOW_TIMESTAMP = True
    elif key == ord('8'):
        SHOW_TIMESTAMP = False
    elif key == ord('9'):
        SHOW_EVENT_TITLE = not SHOW_EVENT_TITLE

    if key == 32:
        space_held = True
    elif key != -1:
        space_held = False
    hand_present = False

    if hand_results.multi_hand_landmarks:
        for handLms in hand_results.multi_hand_landmarks:
            wrist = handLms.landmark[0]
            middle_tip = handLms.landmark[12]

            if wrist.y > middle_tip.y:
                hand_present = True

    holding = hand_present or space_held

    if holding and not gesture_active:
        gesture_active = True
        gesture_start_time = now
        trigger_armed = True

    if not holding and gesture_active:
        gesture_active = False
        trigger_armed = False
        gesture_progress = 0.0

    if gesture_active:
        hold_time = now - gesture_start_time
        gesture_progress = min(hold_time / GESTURE_HOLD_TIME, 1.0)

        center = (80, 80)
        radius = 40
        thickness = 6

        cv2.circle(preview, center, radius, (80, 80, 80), thickness)

        angle = int(360 * gesture_progress)
        cv2.ellipse(preview, center, (radius, radius), -90, 0, angle, (0,255,255), thickness)

        if gesture_progress >= 1.0 and trigger_armed and now > capture_cooldown:
            capture_pending = True
            capture_start_time = now
            gesture_active = False
            trigger_armed = False
            gesture_progress = 0.0
    else:
        gesture_progress = 0.0

    if current_filter != 0 and face_results.multi_face_landmarks:
        for face_landmarks in face_results.multi_face_landmarks:
            lm = face_landmarks.landmark
            left_eye = lm[33]
            right_eye = lm[263]

            x1, y1 = int(left_eye.x*w), int(left_eye.y*h)
            x2, y2 = int(right_eye.x*w), int(right_eye.y*h)

            eye_width = int(np.hypot(x2-x1, y2-y1))
            angle = -np.degrees(np.arctan2(y2-y1, x2-x1))

            if current_filter == 1:
                filter_img = glasses_img; width_scale = 2.2
            elif current_filter == 2:
                filter_img = crown_img; width_scale = 2.6
            else:
                filter_img = mustache_img; width_scale = 1.6

            fw = int(eye_width * width_scale)
            scale = fw / filter_img.shape[1]
            fh = int(filter_img.shape[0] * scale)

            resized = cv2.resize(filter_img, (fw, fh))
            resized = rotate_png(resized, angle)

            cx = int((x1+x2)/2)
            cy = int((y1+y2)/2)

            x_offset = int(cx - fw/2)

            if current_filter == 2:
                forehead = lm[10]
                fx, fy = int(forehead.x*w), int(forehead.y*h)
                x_offset = int(fx - fw/2)
                y_offset = int(fy - fh*0.80)
            elif current_filter == 3:
                nose = lm[2]
                nx, ny = int(nose.x*w), int(nose.y*h)
                x_offset = int(nx - fw/2)
                y_offset = int(ny - fh*0.40)
            else:
                y_offset = int(cy - fh/2)

            overlay_png(preview, resized, x_offset, y_offset)
            overlay_png(clean, resized, x_offset, y_offset)

    draw_event_text(preview)
    if frame_enabled:
        overlay_fullscreen(preview, frame_img)

    if capture_pending:
        elapsed = now - capture_start_time
        remaining = int(COUNTDOWN_SECONDS - elapsed)

        if remaining > 0:
            cv2.putText(preview, f"Capturing in {remaining}", (30,60),
                        cv2.FONT_HERSHEY_SIMPLEX, 1.2, (0,0,255), 3)
        else:
            final = clean.copy()
            draw_event_text(final)
            if frame_enabled:
                overlay_fullscreen(final, frame_img)

            strip_images.append(final)

            flash = np.ones_like(preview) * 255
            cv2.imshow("PRO Photobooth", flash)
            cv2.waitKey(120)

            playsound(os.path.join(os.path.dirname(__file__), "camera.mp3"))

            if STRIP_MODE:
                if len(strip_images) < STRIP_COUNT:
                    capture_pending = False
                    gesture_active = False
                    trigger_armed = False
                    gesture_progress = 0.0
                    capture_cooldown = now + COOLDOWN_TIME
                    print(f"📸 Photo {len(strip_images)}/{STRIP_COUNT} captured")
                    continue
                else:
                    img_h, img_w = strip_images[0].shape[:2]
                    border = 40

                    strip_h = (img_h * STRIP_COUNT) + border * (STRIP_COUNT + 1)
                    strip_w = img_w + border * 2

                    strip_canvas = np.ones((strip_h, strip_w, 3), dtype=np.uint8) * 255

                    y = border
                    for img in strip_images:
                        strip_canvas[y:y+img_h, border:border+img_w] = img
                        y += img_h + border

                    photo_path = os.path.join("photos", person_name, f"strip_{int(now)}.jpg")
                    cv2.imwrite(photo_path, strip_canvas)
                    print("📸 Strip saved:", photo_path)

                strip_images = []

            else:
                photo_path = os.path.join("photos", person_name, f"photo_{int(now)}.jpg")
                cv2.imwrite(photo_path, final)
                print("📸 Photo saved:", photo_path)

            flash = np.ones_like(preview) * 255
            cv2.imshow("PRO Photobooth", flash)
            cv2.waitKey(120)

            playsound(os.path.join(os.path.dirname(__file__), "camera.mp3"))
            capture_pending = False
            gesture_active = False
            trigger_armed = False
            gesture_progress = 0.0
            capture_cooldown = now + COOLDOWN_TIME

    cv2.imshow("PRO Photobooth", preview)

    if key == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()