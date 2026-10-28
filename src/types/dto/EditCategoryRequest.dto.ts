import { RegisterCategoryRequest } from "./RegisterCategoryRequest.dto";

type UUID = string;

export interface EditCategoryRequest extends RegisterCategoryRequest {
  id: UUID;
}
