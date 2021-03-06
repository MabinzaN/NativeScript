﻿import {
    SwitchBase, Color, colorProperty, backgroundColorProperty, backgroundInternalProperty, checkedProperty
} from "./switch-common";

export * from "./switch-common";

@Interfaces([android.widget.CompoundButton.OnCheckedChangeListener])
class CheckedChangeListener extends java.lang.Object implements android.widget.CompoundButton.OnCheckedChangeListener {
    constructor(private owner: WeakRef<Switch>) {
        super();
        return global.__native(this);
    }

    onCheckedChanged(buttonView: android.widget.CompoundButton, isChecked: boolean): void {
        let owner = this.owner.get();
        if (owner) {
            checkedProperty.nativeValueChange(owner, isChecked);
        }
    }
}

export class Switch extends SwitchBase {
    private _android: android.widget.Switch;
    private listener: android.widget.CompoundButton.OnCheckedChangeListener;
    public checked: boolean;

    get android(): android.widget.Switch {
        return this._android;
    }

    public _createNativeView() {
        this._android = new android.widget.Switch(this._context);
        this.listener = this.listener || new CheckedChangeListener(new WeakRef(this));
        this._android.setOnCheckedChangeListener(this.listener);
    }

    get [checkedProperty.native](): boolean {
        return false;
    }
    set [checkedProperty.native](value: boolean) {
        this._android.setChecked(value);
    }

    get [colorProperty.native](): number {
        return -1;
    }
    set [colorProperty.native](value: number | Color) {
        if (value instanceof Color) {
            this._android.getThumbDrawable().setColorFilter(value.android, android.graphics.PorterDuff.Mode.SRC_IN);
        } else {
            this._android.getThumbDrawable().clearColorFilter();
        }
    }

    get [backgroundColorProperty.native](): number {
        return -1;
    }
    set [backgroundColorProperty.native](value: number | Color) {
        if (value instanceof Color) {
            this._android.getTrackDrawable().setColorFilter(value.android, android.graphics.PorterDuff.Mode.SRC_IN);
        } else {
            this._android.getTrackDrawable().clearColorFilter();
        }
    }

    get [backgroundInternalProperty.native](): any {
        return null;
    }
    set [backgroundInternalProperty.native](value: any) {
        //
    }
}