import React from "react";
import { useTaskContext } from "../../context/TaskContext";
import { truncateText } from "../../utils/string";
import apiService from "../../services/apiService";

const TaskList = () => {
    const { taskList, updateContextData } = useTaskContext();

    const renderList = (task) => {
        const { title, id, description } = task;
        return (
            <div className="rounded-xl bg-base-300 p-6" key={id}>
                <div className="flex justify-between">
                    <div>
                        <div className="text-xl">{title}</div>
                        <div className="text-sm">
                            {truncateText(description)}
                        </div>
                    </div>
                    <div>
                        <ul className="menu menu-horizontal bg-base-200/80 menu-xs rounded-box p-2">
                            <li>
                                <div
                                    className="tooltip"
                                    data-tip="Mark as Done"
                                >
                                    <svg
                                        onClick={() => markAsDone(id)}
                                        width="20"
                                        height="20"
                                        fill="none"
                                        className="stroke-current"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M20 6 9 17l-5-5"></path>
                                    </svg>
                                </div>
                            </li>
                            <li>
                                <div className="tooltip" data-tip="Delete Task">
                                    <svg
                                        onClick={() => deleteTask(id)}
                                        width={20}
                                        height={20}
                                        fill="none"
                                        className="stroke-current"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M3 6h18" />
                                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                    </svg>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    };

    const markAsDone = (id) => {
        apiService
            .put("mark-as-done/" + id)
            .then(() => {
                updateContextData();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const deleteTask = (id) => {
        apiService
            .delete("delete-task/" + id)
            .then(() => {
                updateContextData();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title text-3xl">Your Task</h2>
                <p className="text-sm">Stay on top</p>
                <div className="flex flex-col gap-3 mt-5 max-h-[25rem] overflow-y-auto px-5">
                    {taskList.map(renderList)}
                </div>
            </div>
        </div>
    );
};

export default TaskList;
