import * as uuid from "uuid";
import { APIGatewayProxyEvent } from "aws-lambda";


export async function createCustomer( event: APIGatewayProxyEvent ): Promise<TodoItem> {
    const itemId = uuid.v4();
    const userId = getUserId(event);
    const newTodo: CreateTodoRequest = typeof event.body === "string" ? JSON.parse(event.body) : event.body;
    const createdTodo = await todos.createTodo(
      { 
        userId: userId,
        todoId: itemId,
        createdAt: new Date().toISOString(),
        done: false,
        ...newTodo
      }
    );
  return createdTodo;
}