import { BankDetails } from './bank-details';

describe('BankDetails', () => {
  it('should create an instance', () => {
    expect(new BankDetails("","",0.0 )).toBeTruthy();
  });
});
