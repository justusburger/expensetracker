module ExpenseTracker.Models {
    
    export interface IPopup {
        style?: PopupStyleEnum;
        title: string;
        text: string;
        model?: any;
        buttons: IPopupButton[];
        size?: PopupSizeEnum;
    }

    export enum PopupStyleEnum {
        Default,
        Danger
    }

    export enum PopupSizeEnum {
        Default,
        Small,
        Large
    }

    export interface IPopupButton {
        style?: PopupButtonStyleEnum;
        text: string;
        clickFn?: (model: any) => void;
    }

    export enum PopupButtonStyleEnum {
        Default,
        Danger,
        Success
    }


} 