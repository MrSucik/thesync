import pygame
import time

IMAGE_PATH = 'C:/Users/Identity/Pictures/baka.png'
WINDOW_HEIGHT = 1920
WINDOW_WIDTH = 1080
HEADER_HEIGHT = 100
FOOTER_HEIGHT = 100
SPEED = 1
TIMEOUT = 5
pygame.init()

window = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT), pygame.FULLSCREEN)
clock = pygame.time.Clock()

image = pygame.image.load(IMAGE_PATH)
image_height = image.get_rect().size[1]
position_y = 0
backward = False

# overlay = pygame.Overlay(pygame.YV12_OVERLAY, (WINDOW_WIDTH, WINDOW_HEIGHT))


def scroll():
    global position_y, backward
    if backward:
        if position_y < 0:
            position_y = position_y + SPEED
        else:
            backward = False
            time.sleep(TIMEOUT)
    else:
        if position_y > (image_height - WINDOW_HEIGHT) * -1:
            position_y = position_y - SPEED
        else:
            backward = True
            time.sleep(TIMEOUT)


run = False
while not run:
    clock.tick(60)
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            run = True

    # scroll()
    print(pygame.__file__)
    # print(overlay.get_hardware())

    window.blit(image, (0, HEADER_HEIGHT + position_y))
    pygame.display.flip()

pygame.quit()
exit()
