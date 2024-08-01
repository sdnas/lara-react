<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TaskApiController extends Controller
{
    protected $model;

    public function __construct()
    {
        $this->model = new Task();
    }

    public function saveTask(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string',
            'description' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors', $validator->errors()], 422);
        }

        $this->model->createTask([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return response()->json(['message' => 'Task Added!'], 200);
    }

    public function getAllTask()
    {
        return response()->json(['data' => $this->model->getTaskList()], 200);
    }

    public function markAsDone($taskId)
    {
        $isUpdated = $this->model->markAsDone($taskId);

        if ($isUpdated) {
            return response()->json(['message' => 'Task is Done!'], 200);
        }

        return response()->json(['error' => 'Failed to update Task'], 422);
    }

    public function deleteTask($taskId)
    {
        $isDeleted = $this->model->deleteTask($taskId);

        if ($isDeleted) {
            return response()->json(['message' => 'Task is Deleted!'], 200);
        }

        return response()->json(['error' => 'Failed to delete Task'], 422);
    }
}
