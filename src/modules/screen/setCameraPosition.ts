import {
  centerOf,
  mouse,
  screen,
  straightTo,
  Button,
  down,
  sleep,
  left,
} from '@nut-tree/nut-js';

async function findCompass(): Promise<void> {
  try {
    await mouse.move(
      straightTo(centerOf(screen.find('Compass.png', { confidence: 0.6 }))),
    );
  } catch {
    try {
      await mouse.move(
        straightTo(
          centerOf(screen.find('Compass-45.png', { confidence: 0.6 })),
        ),
      );
    } catch {
      try {
        await mouse.move(
          straightTo(
            centerOf(screen.find('Compass-90.png', { confidence: 0.6 })),
          ),
        );
      } catch {
        try {
          await mouse.move(
            straightTo(
              centerOf(screen.find('Compass-135.png', { confidence: 0.6 })),
            ),
          );
        } catch {
          try {
            await mouse.move(
              straightTo(
                centerOf(screen.find('Compass-180.png', { confidence: 0.6 })),
              ),
            );
          } catch {
            try {
              await mouse.move(
                straightTo(
                  centerOf(screen.find('Compass-225.png', { confidence: 0.6 })),
                ),
              );
            } catch {
              try {
                await mouse.move(
                  straightTo(
                    centerOf(
                      screen.find('Compass-270.png', { confidence: 0.6 }),
                    ),
                  ),
                );
              } catch {
                await mouse.move(
                  straightTo(
                    centerOf(
                      screen.find('Compass-315.png', { confidence: 0.6 }),
                    ),
                  ),
                );
              }
            }
          }
        }
      }
    }
  }
}

async function setCameraPosition(): Promise<void> {
  await findCompass();
  await mouse.leftClick();
  await mouse.move(left(300));
  await mouse.scrollUp(100);
  await mouse.scrollDown(50); // 20 neutral
  await sleep(200);
  await mouse.pressButton(Button.MIDDLE);
  await sleep(Math.random() * 50);
  await mouse.move(down(400));
  await sleep(Math.random() * 50);
  await mouse.releaseButton(Button.MIDDLE);
}

export { setCameraPosition };
