import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Recipe} from "../utils/constants";

@Injectable({
    providedIn: 'root'
})
export class RecipeService {

    private baseUrl = "http://localhost:8082"

    constructor(private httpClient: HttpClient) {
    }

    public findAllRecipes(page: number = 0, size: number = 5, sort: string = 'ASC'): Observable<any> {
        let paramData: HttpParams = new HttpParams()
            .set('page', page)
            .set('size', size)
            .set('sort', sort);

        return this.httpClient.get(
            this.baseUrl + '/recipe',
            {params: paramData}
        )
    }

    public findRecipeById(recipeID: number): Observable<any> {
        return this.httpClient.get(
            this.baseUrl + '/recipe/' + recipeID)
    }

    public deleteRecipe(recipeID: number): Observable<any> {
        return this.httpClient.delete(
            this.baseUrl + '/recipe/' + recipeID)
    }

    public createRecipe(recipeData: Recipe) {
        return this.httpClient.post(
            this.baseUrl + '/recipe',
            recipeData)
    }

    public updateRecipe(recipeData: any, recipeID: number): Observable<any> {
        return this.httpClient.put(
            this.baseUrl + '/recipe/' + recipeID,
            recipeData)
    }

    public likeRecipe(recipeID: number): Observable<any> {
        return this.httpClient.put(
            this.baseUrl + '/recipe/' + recipeID + '/like',
            null)
    }
}
