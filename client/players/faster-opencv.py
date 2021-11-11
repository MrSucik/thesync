# import the necessary packages
import time
from queue import Queue
from threading import Thread

import cv2
import imutils
import numpy as np
from imutils.video import FPS


class FileVideoStream:
    def __init__(self, path, queueSize=2048):
        self.stream = cv2.VideoCapture(path)
        self.stopped = False
        self.Q = Queue(maxsize=queueSize)

    def start(self):
        t = Thread(target=self.update, args=())
        t.daemon = True
        t.start()
        return self

    def update(self):
        while True:
            if self.stopped:
                return
            if not self.Q.full():
                (grabbed, frame) = self.stream.read()
                if not grabbed:
                    self.stop()
                    return
                self.Q.put(frame)

    def read(self):
        return self.Q.get()

    def more(self):
        return self.Q.qsize() > 0

    def stop(self):
        self.stopped = True


fvs = FileVideoStream('output.mp4').start()
time.sleep(1)
fps = FPS().start()

while fvs.more():
    frame = fvs.read()
    frame = imutils.resize(frame, width=1080)
    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    frame = np.dstack([frame, frame, frame])

    cv2.imshow("Window", frame)
    cv2.waitKey(1)
    fps.update()

fps.stop()
print("[INFO] elapsed time: {:.2f}".format(fps.elapsed()))
print("[INFO] approx. FPS: {:.2f}".format(fps.fps()))
cv2.destroyAllWindows()
fvs.stop()
