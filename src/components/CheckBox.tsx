import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Task } from './TodoList'

interface props {
  task: Task;
  onClick: () => void;
}

function Checkbox({ task, onClick }: props) {

  return (
    <div className="flex justify-center">

      <span
        onClick={onClick} // Triggers the handleCheckboxChange function when the span is clicked, toggling the checkbox state
        className={
          `inline-flex m-4 size-5 items-center justify-center leading-none text-white text-xs border-2 border-gray-400 rounded-md transition-all hover:size-6 hover:m-[14px]
          ${ task.completed ? "bg-blue-500 border-blue-500" : "bg-white" }` // ${...} this is for picking the color based on the state, transition-colors is just saying that when there's a color change, transition between them smoothly
        }
      >
        {task.completed && <FontAwesomeIcon icon={faCheck} />}
      </span>
    </div>
  );
}

export default Checkbox;
