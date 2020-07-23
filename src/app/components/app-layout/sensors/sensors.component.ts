import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.scss']
})
export class SensorsComponent implements OnInit {

  treeDataRaw: any[];

  constructor() { }

  ngOnInit(): void {
    this.treeDataRaw = [
      'Global.Administration.UserManagement.Users.View',
      'Global.Administration.UserManagement.UserGroups.View',
      'Global.Administration.UserManagement.UserGroups.AddUser',
      'Global.Administration.UserManagement.UserGroups.RemoveUser',
      'Global.PlatformManagement.Tenants.View',
      'Global.PlatformManagement.Tenants.Add',
      'Global.PlatformManagement.Tenants.Edit',
      'Global.PlatformManagement.Tenants.Delete'
    ];
    const rawArray = [];
    for (const data of this.treeDataRaw) {
      rawArray.push(data.split('.'));
    }
    const node = this.createTree(rawArray);
  }

  createTree(structure, topItem = 'Global') {
    const node = (name, parent = null) => ({name, parent, children: []});
    const addNode = (parent, child) => (parent.children.push(child), child);
    const findNamedNode = (name, parent) => {
      for (const child of parent.children) {
        if (child.name === name) { return child; }
        const found = findNamedNode(name, child);
        if (found) { return found; }
      }
    };
    const TOP_NAME = 'Global';
    const top = node(TOP_NAME);
    let current;

    for (const children of structure) {
      current = top;
      for (const name of children) {
        const found = findNamedNode(name, current);
        current = found ? found : addNode(current, node(name, current.name));
      }
    }
    return top;
  }
}
