import { ThemeProvider } from '@/components/theme-provider';
import { TodoItem, todoList as todoListData } from './data';
import TodoCard from './components/ui/todoCard';
import Container from './components/ui/container';
import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  MouseSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arraySwap,
  rectSwappingStrategy,
} from '@dnd-kit/sortable';
import DragOverlayWrapper from './components/ui/DragOverlayWrapper';

function App() {
  const [todoList, setTodoList] = useState<TodoItem[]>(todoListData);

  const toggleCompleted = (id: string) => {
    const updatedList = todoList.map((todo) => {
      if (id === todo.id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodoList(updatedList);
  };

  const mouseSensors = useSensor(MouseSensor, {
    activationConstraint: { distance: 5 },
  });
  const sensors = useSensors(mouseSensors);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id && over.id) {
      if (active.id !== over.id) {
        setTodoList((items) => {
          const oldIndex = todoList.findIndex((item) => item.id === active.id);
          const newIndex = todoList.findIndex((item) => item.id === over.id);

          return arraySwap(items, oldIndex, newIndex);
        });
      }
    }
  }
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <div className='h-full w-full flex justify-center items-center'>
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
          <SortableContext
            items={todoList?.filter((todo) => todo?.isDraggable)}
            strategy={rectSwappingStrategy}
          >
            <DragOverlayWrapper />
            <Container alignment='flex'>
              {todoList.map((todo) => (
                <TodoCard
                  cardData={todo}
                  key={todo.id}
                  toggleCompleted={toggleCompleted}
                />
              ))}
            </Container>
          </SortableContext>
        </DndContext>
      </div>
    </ThemeProvider>
  );
}

export default App;
