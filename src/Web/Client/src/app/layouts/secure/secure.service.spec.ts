import { TestBed } from '@angular/core/testing';

import { SecureService } from './secure.service';

var secureService: SecureService;

describe('SecureService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({});
        secureService = TestBed.get(SecureService);
    });

    describe('emptyAuthKey', () => {
        it('should call removeItem of sessionStorage with param of \'token\'', () => {
            spyOn(sessionStorage, 'removeItem');
            secureService.emptyAuthKey();
            expect(sessionStorage.removeItem).toHaveBeenCalledWith('token');
        });
    });

    it('should be created', () => {
        const service: SecureService = TestBed.get(SecureService);
        expect(service).toBeTruthy();
    });
});
