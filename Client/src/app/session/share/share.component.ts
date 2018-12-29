import { Component, OnInit, Input } from "@angular/core";

@Component({
    selector: "app-share",
    template: `
        <p *ngIf="!canShare">
            Invite others to join at
            <a (click)="inviteOthers()">{{ currentUrl }}</a>
        </p>
        <div (click)="inviteOthers()" *ngIf="canShare">
            <a>Invite others to join</a>
            <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 481.6 481.6"
                style="enable-background:new 0 0 481.6 481.6;"
                xml:space="preserve"
                width="1.2em"
                height="1.2em"
            >
                <g>
                    <path
                        d="M381.6,309.4c-27.7,0-52.4,13.2-68.2,33.6l-132.3-73.9c3.1-8.9,4.8-18.5,4.8-28.4c0-10-1.7-19.5-4.9-28.5l132.2-73.8
c15.7,20.5,40.5,33.8,68.3,33.8c47.4,0,86.1-38.6,86.1-86.1S429,0,381.5,0s-86.1,38.6-86.1,86.1c0,10,1.7,19.6,4.9,28.5
l-132.1,73.8c-15.7-20.6-40.5-33.8-68.3-33.8c-47.4,0-86.1,38.6-86.1,86.1s38.7,86.1,86.2,86.1c27.8,0,52.6-13.3,68.4-33.9
l132.2,73.9c-3.2,9-5,18.7-5,28.7c0,47.4,38.6,86.1,86.1,86.1s86.1-38.6,86.1-86.1S429.1,309.4,381.6,309.4z M381.6,27.1
c32.6,0,59.1,26.5,59.1,59.1s-26.5,59.1-59.1,59.1s-59.1-26.5-59.1-59.1S349.1,27.1,381.6,27.1z M100,299.8
c-32.6,0-59.1-26.5-59.1-59.1s26.5-59.1,59.1-59.1s59.1,26.5,59.1,59.1S132.5,299.8,100,299.8z M381.6,454.5
c-32.6,0-59.1-26.5-59.1-59.1c0-32.6,26.5-59.1,59.1-59.1s59.1,26.5,59.1,59.1C440.7,428,414.2,454.5,381.6,454.5z"
                    />
                </g>
            </svg>
        </div>
    `
})
export class ShareComponent implements OnInit {
    @Input()
    currentUrl: string;

    public canShare = false;

    public ngOnInit(): void {
        this.canShare = this.isShareFeaturePresent();
    }

    public isShareFeaturePresent(): boolean {
        return navigator["share"] ? true : false;
    }

    public inviteOthers(): void {
        if (this.isShareFeaturePresent()) {
            navigator["share"]({
                title: "Planning-Poker",
                text: "Join my session on Planning-Poker!",
                url: this.currentUrl
            });
        } else {
            let selBox = document.createElement("textarea");
            selBox.style.position = "fixed";
            selBox.style.left = "0";
            selBox.style.top = "0";
            selBox.style.opacity = "0";
            selBox.value = this.currentUrl;
            document.body.appendChild(selBox);
            selBox.focus();
            selBox.select();
            document.execCommand("copy");
            document.body.removeChild(selBox);
            alert(`Copied "${this.currentUrl}" to clipboard`);
        }
    }
}