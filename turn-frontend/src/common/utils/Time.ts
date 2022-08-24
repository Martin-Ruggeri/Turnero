/*
 * Clase Time
 * Author: Martin Ruggeri
 * Call:  let date: Time = new Time(213568926213);
 */

export class Time {
    public miliseconds: number;

    private _HOURS   = 60 * 60 * 1000;
    private _MINUTES = 60 * 1000;
    private _SECONDS = 1000;
    private _MAX_MILISECONDS = 23 * this._HOURS + 59 * this._MINUTES + 59 * this._SECONDS;
    private _MIN_MILISECONDS = 0;

    constructor(miliseconds: number){
        this.miliseconds = miliseconds;
    }

    setHours(hours: number): void{
        const miliseconds_minutes_seconds = this.miliseconds - this.getHours() * this._HOURS;
        const miliseconds_final = hours * this._HOURS + miliseconds_minutes_seconds;

        if(miliseconds_final < this._MIN_MILISECONDS || miliseconds_final > this._MAX_MILISECONDS){
            this.miliseconds = this._MIN_MILISECONDS;
        }else{
            this.miliseconds = miliseconds_final; 
        }
    }

    setMinutes(minutes: number): void{
        const miliseconds_hours = this.miliseconds - (this.getMinutes() * this._MINUTES) - (this.getSeconds() * this._SECONDS);
        const miliseconds_seconds = this.miliseconds - (this.getHours() * this._HOURS) - (this.getMinutes() * this._MINUTES);
        const miliseconds_final = minutes * this._MINUTES + miliseconds_hours + miliseconds_seconds;

        if(miliseconds_final < this._MIN_MILISECONDS || miliseconds_final > this._MAX_MILISECONDS){
            this.miliseconds = this._MIN_MILISECONDS;
        }else{
            this.miliseconds = miliseconds_final; 
        }
    }

    setSeconds(seconds: number): void{
        const miliseconds_hours_minutes = this.miliseconds - (this.getSeconds() * this._SECONDS);
        const miliseconds_final = seconds * this._SECONDS + miliseconds_hours_minutes ;

        if(miliseconds_final < this._MIN_MILISECONDS || miliseconds_final > this._MAX_MILISECONDS){
            this.miliseconds = this._MIN_MILISECONDS;
        }else{
            this.miliseconds = miliseconds_final; 
        }
    }

    setMiliSeconds(miliseconds: number): void{
        if(miliseconds < this._MIN_MILISECONDS || miliseconds > this._MAX_MILISECONDS){
            this.miliseconds = this._MIN_MILISECONDS;
        }else{
            this.miliseconds = miliseconds; 
        }
    }

    getHours(): number{
        return Math.trunc(this.miliseconds / this._HOURS);
    }

    getMinutes(): number{
        const miliseconds = this.miliseconds - (this.getHours() * this._HOURS);
        return Math.trunc(miliseconds / this._MINUTES);
    }

    getSeconds(): number{
        const miliseconds = this.miliseconds - (this.getHours() * this._HOURS) - (this.getMinutes() * this._MINUTES);
        return Math.trunc(miliseconds / this._SECONDS);
    }

    getTime(): number{
        return this.miliseconds;
    }

    public toString = () : string => {
        const hours = this.getHours().toString().length === 1 ? `0${this.getHours()}` : this.getHours();
        const minutes = this.getMinutes().toString().length === 1 ? `0${this.getMinutes()}` : this.getMinutes();
        const seconds = this.getSeconds().toString().length === 1 ? `0${this.getSeconds()}` : this.getSeconds();

        return `${hours}:${minutes}:${seconds}`;
    }

}