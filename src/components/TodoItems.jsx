import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";

import delete_icon from "../assets/delete.png";

const TodoItems = ({ id, task, isComplete, remove, toggle }) => {
  return (
    <div className="flex items-center my-3 gap-8">
      <div className="w-6 cursor-pointer">
        <img
          onClick={() => toggle(id)}
          src={isComplete ? tick : not_tick}
          alt=""
        />
      </div>
      <div
        className={`flex-1  ${
          isComplete ? "line-through" : null
        } decoration-slate-500`}
      >
        {task}
      </div>
      <div onClick={() => remove(id)} className="w-4 cursor-pointer">
        <img src={delete_icon} alt="" />
      </div>
    </div>
  );
};

export default TodoItems;
