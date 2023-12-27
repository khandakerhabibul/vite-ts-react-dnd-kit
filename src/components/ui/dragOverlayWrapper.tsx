import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import React, { useState } from 'react';
import { TodoCardGrabbing } from './todoCard';
import { TodoItem } from '@/data';

function DragOverlayWrapper() {
  const [draggingComponent, setDraggingComponent] = useState<Active | null>(
    null
  );
  useDndMonitor({
    onDragStart: (event) => {
      setDraggingComponent(event.active);
    },
    onDragEnd: () => {
      setDraggingComponent(null);
    },
    onDragCancel: () => {
      setDraggingComponent(null);
    },
  });
  console.log({ draggingComponent: draggingComponent?.data });

  if (!draggingComponent) {
    return null;
  }

  if (draggingComponent) {
    const typedData = draggingComponent.data.current;
    const cardData = typedData?.cardData as TodoItem;
    if (cardData) {
      return (
        <DragOverlay>
          <TodoCardGrabbing cardData={cardData} />
        </DragOverlay>
      );
    }
  }

  return (
    <DragOverlay>
      <div>DragOverlayWrapper</div>
    </DragOverlay>
  );
}

export default DragOverlayWrapper;
