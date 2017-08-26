/* tslint:disable: no-unused-expression arrow-parens */

import { expect } from 'chai';
import add from '../src/index';

describe('Testing addition', () => {
	it('returns 11 for 3,8', done => {
		const p = add(3, 8);
		expect(p).to.equal(11);
		done();
	});
});
