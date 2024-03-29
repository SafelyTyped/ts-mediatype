//
// Copyright (c) 2020-present Ganbaro Digital Ltd.
//
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
// 1. Redistributions of source code must retain the above copyright
//    notice, this list of conditions and the following disclaimer.
// 2. Redistributions in binary form must reproduce the above copyright
//    notice, this list of conditions and the following disclaimer in the
//    documentation and/or other materials provided with the
//    distribution.
// 3. Neither the names of the copyright holders nor the names of its
//    contributors may be used to endorse or promote products derived
//    from this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
import { expect } from "chai";
import { describe } from "mocha";

import { ValidMediaTypeExamples } from "../_fixtures/MediaTypeExamples";
import { makeMediaTypeDataFromMediaTypeParts } from "@safelytyped/mediatype";
import { isMediaTypeData } from "@safelytyped/mediatype";
import type { MediaTypeParts } from "@safelytyped/mediatype";

interface FailExample {
    inputValue: MediaTypeParts;
    expectedValue: string;
}

describe("makeMediaTypeDataFromMediaTypeParts()", () => {
    describe("it converts MediaTypeParts back into a string", () => {
        ValidMediaTypeExamples.forEach((example) => {
            // shorthand
            //
            // these are backwards, because our fixtures assume conversion
            // TO a MediaType, and we are converting FROM a MediaType
            const expectedValue = example.formatValue ?? example.inputValue;
            const inputValue = example.expectedValue;

            it("correctly converts parts to '" + expectedValue + "'", () => {
                const actualValue = makeMediaTypeDataFromMediaTypeParts(inputValue);
                expect(actualValue).to.eql(expectedValue);

                // prove that the resulting string is valid
                expect(isMediaTypeData(actualValue)).to.equal(true);
            })
        });
    });

    describe("it fail predictably when we get broken MediaTypeParts", () => {
        const examples: FailExample[] = [
            {
                inputValue: {
                    type: "",
                    subtype: "",
                },
                expectedValue: "",
            },
            {
                inputValue: {
                    type: "",
                    subtype: "",
                    suffix: "",
                },
                expectedValue: ""
            }
        ];

        examples.forEach((example: FailExample) => {
            const { inputValue, expectedValue } = example;

            it("fails gracefully for '" + JSON.stringify(inputValue) + "'", () => {
                const actualValue = makeMediaTypeDataFromMediaTypeParts(inputValue);
                expect(actualValue).to.eql(expectedValue);
            })
        });
    });
});