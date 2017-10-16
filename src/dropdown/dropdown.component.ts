import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
    selector: 'dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss'],
    animations: [
        trigger('slideUpDownAnim', [
            transition(':enter', [
                animate('260ms ease-in', keyframes([
                        style({opacity: 0, offset: 0}),
                        style({opacity: 1, offset: 1.0}),
                    ])
                )
            ]),
            transition(':leave', [
                animate('300ms ease-out', keyframes([
                        style({opacity: 1, offset: 0}),
                        style({opacity: 0, offset: 1.0}),
                    ])
                )
            ])
        ]),
    ]

})
export class DropdownComponent implements OnInit {
    @Input() closeAfterClick?: boolean = true;
    @Input() isMaxHeight?: boolean = false;
    @Input() maxHeight?: number = 180;

    @Output() closed = new EventEmitter();

    opened:boolean = false;

    constructor() {
    }

    ngOnInit() {
    }

    toggleOpen(toogle:boolean){
        if(toogle){
            this.opened = toogle;
        }else{
            this.opened = !this.opened;
        }

        if(this.opened == false){   //Closed event emit
            this.closed.emit();
        }

    }

    closeMenu(){
        if(this.closeAfterClick){
            this.opened = false;
        }
    }

    dropDownAreaStyle(){
        if(this.isMaxHeight){
            return {'overflow' : 'scroll', 'max-height' : this.maxHeight + 'px'};
        }
    }

}
