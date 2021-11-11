import cv2

from imutils.video import FPS

capture = cv2.VideoCapture('output.mp4')

fps = FPS().start()
if (capture.isOpened() == False):
    print("Error opening video  file")

while (capture.isOpened()):

    ret, frame = capture.read()
    if ret == True:

        cv2.imshow('Frame', frame)
        fps.update()
        if cv2.waitKey(25) & 0xFF == ord('q'):
            break

    # Break the loop
    else:
        break

fps.stop()
print("[INFO] elapsed time: {:.2f}".format(fps.elapsed()))
print("[INFO] approx. FPS: {:.2f}".format(fps.fps()))
capture.release()
cv2.destroyAllWindows()
