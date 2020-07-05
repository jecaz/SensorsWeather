// import { Injectable } from '@angular/core';
// import * as lowdb from 'lowdb';
// import { default as FileAsync } from 'lowdb/adapters/FileAsync';
// import {Sensor} from "../models/sensor.model";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class LowdbService {
//
//   private db: lowdb.LowdbAsync;
//
//   constructor() {
//     this.initDatabase();
//   }
//
//   set( field: string, value: any ) {
//     this.db.set( field, value ).write();
//   }
//
//   private async initDatabase() {
//     const adapter = new FileAsync( 'mocks/db.json' );
//     this.db = await lowdb( adapter );
//
//     // this.db.defaults( { sensors: Sensor[] } );
//   }
// }
