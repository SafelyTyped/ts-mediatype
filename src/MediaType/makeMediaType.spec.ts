//
// Copyright (c) 2020-present Ganbaro Digital Ltd
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions
// are met:
//
//   * Re-distributions of source code must retain the above copyright
//     notice, this list of conditions and the following disclaimer.
//
//   * Redistributions in binary form must reproduce the above copyright
//     notice, this list of conditions and the following disclaimer in
//     the documentation and/or other materials provided with the
//     distribution.
//
//   * Neither the names of the copyright holders nor the names of his
//     contributors may be used to endorse or promote products derived
//     from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS
// FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
// COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
// INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
// BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
// LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
// CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
// LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
// ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.
//
import { expect } from "chai";
import { describe } from "mocha";

import { InvalidMediaTypeExamples, ValidMediaTypeExamples } from "../_fixtures/MediaTypeExamples";
import { formatMediaTypeParts, MediaTypePartsToUpperCaseRuleset } from "@safelytyped/mediatype";
import { MAKE_MEDIA_TYPE_DEFAULT_OPTIONS } from "@safelytyped/mediatype";
import { makeMediaType } from "@safelytyped/mediatype";

describe("makeMediaType()", () => {
    describe("it accepts valid RFC media types", () => {
        ValidMediaTypeExamples.forEach((example) => {
            // shorthand
            const inputValue = example.inputValue;
            const storedValue = example.formatValue ?? example.inputValue;
            const expectedValue = example.expectedValue;

            it("accepts example '" + inputValue + "'", () => {
                const actualValue = makeMediaType(inputValue);

                expect(actualValue.valueOf()).to.eql(storedValue);
                expect(actualValue.parse()).to.eql(expectedValue);
            });
        });
    });

    describe("it rejects invalid inputs", () => {
        for (const inputValue of InvalidMediaTypeExamples) {
            it("rejects example '" + inputValue + "'", () => {
                expect(() => makeMediaType(inputValue)).to.throw();
            });
        }
    });

    describe("it supports functional options", () => {
        it("default behaviour: normalises the media type's case", () => {
            const inputValue = "APPLICATION/VND.EXAMPLE+YAML; VERSION=3.0; SOURCE=\"application/JSON\"";
            const expectedValue = "application/vnd.example+yaml; version=3.0; source=\"application/JSON\"";

            const actualValue = makeMediaType(inputValue);
            expect(actualValue.valueOf()).to.eql(expectedValue);
        });

        it("does not apply the default options when the user supplies their own", () => {
            const expectedValue = "APPLICATION/VND.EXAMPLE+YAML; VERSION=3.0; SOURCE=\"application/JSON\"";
            const inputValue = "application/vnd.example+yaml; version=3.0; source=\"application/JSON\"";

            const actualValue = makeMediaType(
                inputValue,
                MAKE_MEDIA_TYPE_DEFAULT_OPTIONS,
                (x) => formatMediaTypeParts(x, MediaTypePartsToUpperCaseRuleset)
            );
            expect(actualValue.valueOf()).to.eql(expectedValue);
        });
    });
});