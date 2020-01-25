import { Component }  from '@angular/core';
     
class Item{
    name: string;
    year: string;
     
    constructor(name: string, year: string) {
  
        this.name = name;
        this.year = year;
    }
}
 
@Component({
    selector: 'app',
    template: `<textarea [(ngModel)]="data"></textarea>
    <br>
    <button class="btn btn-default" (click)="loading(data)">Продолжить</button>
    <div class="panel">
        <div class="form-inline">
            <div class="form-group">
                <input class="form-control" [(ngModel)]="text" placeholder = "Имя" />
            </div>
            <div class="form-group">
                <input type="number" class="form-control" [(ngModel)]="year" placeholder="Год" />
            </div>
            <div class="form-group">
                <button class="btn btn-default" (click)="addItem(text, year)">Добавить</button>
            </div>
        </div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Имя</th>
                    <th>Год</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="let item of items">
                    <td (click)="changeItem(item.name, item.year, 'name')">{{item.name}}</td>
                    <td (click)="changeItem(item.name, item.year, 'year')">{{item.year}}</td>
                    <td class="delete"> 
                        <button class="btn btn-default" id="delete" (click)="deleteItem(item.name, item.year)">Удалить</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <textarea id="unload"></textarea>
    <br>
    <button class="btn btn-default" (click)="unloading()">Выгрузить</button>`,
    styles: [`
            button, textarea, table {margin: 10px;}
            textarea, table, .form-inline {width: 540px;}
            .delete {width: 100px;}
            #delete {margin: 2px;}
            .form-group {margin-left: 10px;}
    `]
})

export class AppComponent { 
    items: Item[];
    addItem(name: string, year: string): void {
         
        if(name==null || name.trim()=="" || year==null)
            return;
        this.items.push(new Item(name, year));
    }

    deleteItem(name: string, year: string): void {

        let index;
        this.items.forEach(element => {
            if(JSON.stringify(element)===JSON.stringify({ name: name, year: year })) {
                index = this.items.indexOf(element);
            }
        });
        this.items.splice(index, 1);
    }

    changeItem(name: string, year: string, field: string): void {

        this.items = this.items.map(element => {
            if(JSON.stringify(element)===JSON.stringify({ name: name, year: year })) {
                let newData = prompt("Input new data.");
                if(field === "name") return new Item(newData, element.year);
                if(field === "year") return new Item(element.name, newData);
            }
            return element;
        });
    }

    loading(data: string) {
        /*let items: Item[] = [];
        let name: string;
        data.split("\"").forEach(element => {
            if(data.split("\"").indexOf(element) % 4 == 1) {
                name = element
            }
            if(data.split("\"").indexOf(element) % 4 == 3) {
                items.push({name: name, year: element});
            }
        });
        this.items = items;*/
        let obj = eval('(' + data + ')');
        this.items = obj;
    }

    unloading() {
        let unloadData: string[] = [];
        this.items.forEach(element => {
            unloadData.push(`{name: "${element.name}", year: "${element.year}"}`) ;
        });
        document.getElementById("unload").innerText = `[${unloadData.join(",")}]`;
    }
}
