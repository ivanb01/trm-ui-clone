import { Coordinate } from 'ol/coordinate';
import { Extent } from 'ol/extent';
import { Positioning } from 'ol/Overlay';

export function calculateOverlayePositioning(
  coordinate: Coordinate,
  extent: Extent
): Positioning {
  const [x, y] = coordinate;
  const [minX, minY, maxX, maxY] = extent;

  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;

  let horizontalPosition: 'center' | 'left' | 'right';
  if (x < centerX) {
    horizontalPosition = 'left';
  } else if (x > centerX) {
    horizontalPosition = 'right';
  } else {
    horizontalPosition = 'center';
  }

  let verticalPosition: 'bottom' | 'center' | 'top';
  if (y < centerY) {
    verticalPosition = 'bottom';
  } else if (y > centerY) {
    verticalPosition = 'top';
  } else {
    verticalPosition = 'center';
  }

  return `${verticalPosition}-${horizontalPosition}` as Positioning;
}

export function calculateOverlayeOffset(positioning: Positioning): number[] {
  const [verticalPosition, horizontalPosition] = positioning.split('-');
  let offset = [0, 0];
  switch (verticalPosition) {
    case 'bottom': {
      offset[1] = -5;
      break;
    }
    case 'top': {
      offset[1] = 5;
      break;
    }
  }
  switch (horizontalPosition) {
    case 'right': {
      offset[0] = -5;
      break;
    }
    case 'left': {
      offset[0] = 5;
      break;
    }
  }
  return offset;
}
