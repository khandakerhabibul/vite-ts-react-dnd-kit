import { TodoItem } from '@/data';
import { Card, CardDescription, CardTitle } from './card';
import { cn } from '@/lib/utils';
import { Checkbox } from './checkbox';
import { CSS } from '@dnd-kit/utilities';
// import { useDraggable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';

export const TodoCardPlaceholder = () => {
  return (
    <Card className={cn('px-4 py-2 bg-slate-500 w-[400px]')}>
      <CardTitle>&nbsp;</CardTitle>
      <CardDescription>&nbsp;</CardDescription>
    </Card>
  );
};

type PropType = {
  cardData: TodoItem;
};

const TodoCard = ({
  cardData: { title, description, isDraggable, isCompleted, id },
  toggleCompleted,
}: PropType & {
  toggleCompleted: (id: string) => void;
}) => {
  const {
    attributes,
    setNodeRef,
    transform,
    listeners,
    transition,
    isDragging,
  } = useSortable({
    id,
    disabled: !isDraggable,
    data: { cardData: { title, description, isDraggable, isCompleted, id } },
  });

  // Within your component that receives `transform` from `useDraggable`:
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <Card
      className={cn('px-4 py-2  w-[400px]', {
        'cursor-grab hover:bg-slate-800': isDraggable,
        'bg-slate-700 ': !isDraggable,
      })}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
    >
      {isDragging ? (
        <div className='flex justify-between items-center'>
          <TodoCardPlaceholder />
        </div>
      ) : (
        <div className='flex justify-between items-center'>
          <div>
            <CardTitle className={cn({ 'line-through': isCompleted })}>
              {title}
            </CardTitle>
            <CardDescription className={cn({ 'line-through': isCompleted })}>
              {description}
            </CardDescription>
          </div>
          <Checkbox
            className='cursor-pointer'
            checked={isCompleted}
            onClick={() => {
              toggleCompleted(id);
            }}
          />
        </div>
      )}
    </Card>
  );
};

export default TodoCard;

export const TodoCardGrabbing = ({
  cardData: { title, description, isCompleted },
}: PropType) => {
  return (
    <Card className={cn('px-4 py-2  w-[400px] cursor-grabbing rotate-3')}>
      <CardTitle className={cn({ 'line-through': isCompleted })}>
        {title}
      </CardTitle>
      <CardDescription className={cn({ 'line-through': isCompleted })}>
        {description}
      </CardDescription>
    </Card>
  );
};
