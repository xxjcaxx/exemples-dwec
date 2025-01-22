import { IRecipe } from "./i-recipe"

export interface ISharedRecipe {
  id: string
  meal: string
  meals: IRecipe
  shared_recipes_events: {
    step: number
    user: string
    shared_recipe: number
  }[]
}
