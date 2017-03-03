import { animate, state, style, transition, trigger } from '@angular/core';

export function routerTransition() {
	return slideUpwards();
}

function slideToLeft() {
	return trigger('routerTransition', [
    	state('void', style({ width:'100%' }) ),
    	state('*', style({ width:'100%' }) ),
    	transition(':enter', [  // before 2.1: transition('void => *', [
    		style({ transform: 'translateX(100%)' }),
    		animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
    	]),
    	transition(':leave', [  // before 2.1: transition('* => void', [
    		style({ transform: 'translateX(0%)' }),
    		animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
    	])
	]);
}

export function slideUpwards() {
	return trigger('routerTransition', [
    	state('void', style({ position: 'absolute', width:'100%' }) ),
    	state('*', style({ position: 'absolute', width:'100%' }) ),
    	transition(':enter', [  // before 2.1: transition('void => *', [
    		style({ transform: 'translateY(40%)', opacity: 0 }),
    		animate('0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)', style({ transform: 'translateY(0%)', opacity: 1 }))
    	]),
    	transition(':leave', [  // before 2.1: transition('* => void', [
    		style({ transform: 'translateY(0%)', opacity: 1 }),
    		animate('0.5s cubic-bezier(0.6, -0.28, 0.735, 0.045)', style({ transform: 'translateY(-40%)', opacity: 0 }))
    	])
	]);
}