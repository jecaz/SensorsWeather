import { NgModule } from '@angular/core';
import { ShortenPipe } from './shorten.pipe';
import {FilterPipe} from './filter.pipe';

@NgModule({
    declarations: [
        ShortenPipe,
      FilterPipe
    ],
    imports: [],
    exports: [
        ShortenPipe,
        FilterPipe
    ]
})
export class PipesModule { }
