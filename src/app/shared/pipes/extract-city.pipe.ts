import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'extractCity',
    standalone: true
})
export class ExtractCityPipe implements PipeTransform {
    transform(fullAddress: string): string {
        if (!fullAddress) return '';
        const parts = fullAddress.split(',').map(p => p.trim());
        if (parts.length >= 2) {
            return parts[parts.length - 2];
        } 
        return fullAddress;
    }
}
