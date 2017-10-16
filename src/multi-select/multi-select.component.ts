import {
    Component,
    OnInit,
    DoCheck,
    Input,
    ViewChild,
    ViewChildren,
    QueryList
} from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

import {DropdownComponent} from '../dropdown/dropdown.component';


@Component({
    selector: 'multi-select',
    templateUrl: './multi-select.component.html',
    styleUrls: ['./multi-select.component.scss']
})
export class MultiSelectComponent implements OnInit, DoCheck{
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Properties
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    @ViewChildren('checkbox') checkboxes: QueryList<HTMLElement>;
    @ViewChild('multiDropdown') multiDropdown: DropdownComponent;

    @Input() data: any;
    @Input() control: FormControl;
    @Input() active: Array<any> = [];
    @Input() placeholder?: string = '';
    @Input() disabled?: boolean = false;

    rForm: FormGroup;
    // active:Array<any> = [];
    selectedId: Array<any> = [];
    selectedText: Array<string> = [];

    opened: boolean = false;

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Constructor
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    constructor() { // private fb: FormBuilder
    }


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Methods
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ngOnInit() {}

    ngDoCheck() {
        if (this.active && this.active.length > 0) {
            this.setActiveCheckbox();
        }
    }

    toggleMenu(): void {
        if (this.disabled) return;

        this.opened = !this.opened;
        this.multiDropdown.toggleOpen(this.opened);
    }

    closeMenu(): void {
        this.opened = false;
        this.multiDropdown.toggleOpen(false);
    }

    dropdownClosed(): void {
        this.opened = false;
    }


    checked(): void {
        this.selectedId = [];   // Empty selected items
        this.selectedText = []; // Empty selected items

        this.checkboxes.forEach(chk => {
            let checkbox = chk['nativeElement'];
            let isChekded = checkbox.checked;

            if (isChekded) {
                let id = checkbox.dataset.pairId;
                this.itemSetup(id);
            }
        });

        this.control.setValue(this.selectedId);   // Sync to the formControl
    }


    setActiveCheckbox() {
        if (!this.checkboxes) return;

        this.checkboxes.forEach(chk => {
            let checkbox = chk['nativeElement'];
            let id = checkbox.dataset.pairId;

            this.active.forEach((active, idx: number) => {
                if (active.id == id) {
                    checkbox.checked = true;
                    this.itemSetup(id);
                    this.active.splice(idx, 1);
                }
            });

            this.control.setValue(this.selectedId);   // Sync to the formControl
        });
    }

    itemSetup(id: any) {
        this.selectedId.push(parseInt(id));   // Set id
        this.selectedText.push(this.getSelectedText(id));   // Set text
    }

    getSelectedText(id: number): string {
        let res = '';

        this.data.forEach(item => {
            if (item.id == id) {
                res = item.text;
            };
        });

        return res;
    }


}
