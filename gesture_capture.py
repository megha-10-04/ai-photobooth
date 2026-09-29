import cv2
import mediapipe as mp
from mediapipe.tasks import python
from mediapipe.tasks.python import vision
import time
import os

# =========================
# FACE CASCADE (load once)
# =========================
face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + "haarcascade_frontalface_default.xml"
)

# =========================
# Hand model path
# =========================
MODEL_PATH = "hand_landmarker.task"

base_options = python.BaseOptions(model_asset_path=MODEL_PATH)
options = vision.HandLandmarkerOptions(
    base_options=base_options,
    running_mode=vision.RunningMode.VIDEO,
    num_hands=2
)

detector = vision.HandLandmarker.create_from_options(options)

# =========================
# Camera
# =========================
cap = cv2.VideoCapture(0)

# =========================
# LOAD GLASSES FILTER
# =========================
glasses_png = cv2.imread("filters/glasses.png", cv2.IMREAD_UNCHANGED)

if glasses_png is None:
    print("❌ glasses.png not found in filters folder")

# =========================
# Camera check
# =========================
if not cap.isOpened():
    print("❌ Camera not opened")
    exit()
else:
    print("✅ Camera opened")

# =========================
# PERSON FOLDER SETUP
# =========================
person_name = input("Enter your name: ").strip()

if person_name == "":
    person_name = "Guest"

save_folder = os.path.join("photos", person_name)
os.makedirs(save_folder, exist_ok=True)

print(f"📁 Photos will be saved in: {save_folder}")

# =========================
# Timing controls
# =========================
COOLDOWN = 3
COUNTDOWN_SECONDS = 3

last_capture_time = 0
capture_pending = False
countdown_start = 0

# =========================
# Main loop
# =========================
while True:
    ret, frame = cap.read()
    if not ret:
        break

    # ---------- FACE + GLASSES ----------
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)

    for (x, y, w, h) in faces:
        try:
           glasses_width = int(w * 0.9)
           glasses_height = int(glasses_width * glasses_png.shape[0] / glasses_png.shape[1])
           resized_glasses = cv2.resize(glasses_png, (glasses_width, glasses_height))
           y_offset = y + int(h * 0.05)
           x_offset = x

            # overlay with transparency
           for i in range(glasses_height):
                for j in range(glasses_width):
                    if resized_glasses[i, j][3] != 0:
                        if (y_offset + i < frame.shape[0]) and (x_offset + j < frame.shape[1]):
                            frame[y_offset + i, x_offset + j] = resized_glasses[i, j][:3]
        except:
            pass

    # ---------- HAND DETECTION ----------
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    mp_image = mp.Image(image_format=mp.ImageFormat.SRGB, data=rgb_frame)

    timestamp_ms = int(time.time() * 1000)
    result = detector.detect_for_video(mp_image, timestamp_ms)

    hand_detected = False

    if result.hand_landmarks:
        for hand_landmarks in result.hand_landmarks:
            wrist = hand_landmarks[0]
            middle_tip = hand_landmarks[12]

            if middle_tip.y < wrist.y:
                hand_detected = True
                cv2.putText(frame, "Hand Raised ✋", (30, 50),
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)

    current_time = time.time()

    # ---------- START COUNTDOWN ----------
    if hand_detected and not capture_pending and (current_time - last_capture_time > COOLDOWN):
        capture_pending = True
        countdown_start = current_time

    # ---------- COUNTDOWN ----------
    if capture_pending:
        elapsed = current_time - countdown_start
        remaining = int(COUNTDOWN_SECONDS - elapsed)

        if remaining > 0:
            cv2.putText(frame, f"Capturing in {remaining}...",
                        (30, 100),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        1.2,
                        (0, 0, 255),
                        3)

        if elapsed >= COUNTDOWN_SECONDS:
            filename = os.path.join(save_folder, f"photo_{int(current_time)}.jpg")
            cv2.imwrite(filename, frame)
            print("📸 Photo saved:", filename)

            last_capture_time = current_time
            capture_pending = False

    # ---------- SHOW WINDOW ----------
    cv2.imshow("Gesture Capture Photobooth", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()