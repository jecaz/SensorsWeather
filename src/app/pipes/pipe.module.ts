import { NgModule } from '@angular/core';
import { ShortenPipe } from './shorten.pipe';

@NgModule({
    declarations: [
        ShortenPipe,
    ],
    imports: [],
    exports: [
        ShortenPipe,
    ]
})
export class PipesModule { }
