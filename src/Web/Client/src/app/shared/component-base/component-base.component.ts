import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-component-base',
    templateUrl: './component-base.component.html',
    styleUrls: ['./component-base.component.css']
})
export class ComponentBaseComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

    private _loading: boolean;
    public get loading(): boolean { return this._loading; }
    public set loading(v: boolean) { this._loading = v }

    public errorMessage: string;
    public hasErrors(): boolean {
        return this.errorMessage != null && this.errorMessage.length > 0;
    }


}
