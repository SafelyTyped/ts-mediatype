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

import { describe } from "mocha";
import { expect } from "chai";
import { MediaTypePartsToLowerCaseRuleset } from "./Rulesets/MediaTypePartsToLowerCaseRuleset";
import { parseMediaTypeData, makeMediaTypeDataFromMediaTypeParts } from "../MediaTypeData";
import { formatMediaTypeParts } from "./formatMediaTypeParts";

describe("formatMediaTypeParts()", () => {
    describe("it applies these rules correctly", () => {
        [
            {
                description: "uses the default rule when no other rule exists",
                rules: {
                    description: "THIS IS A TEST",
                    rules: {
                        default: (x: string) => ""
                    }
                },
                inputValue: "application/vnd.example+yaml; version=3.0; source=\"application/json\"",
                expectedValue: "",
            },
            {
                description: "normalises to lower case when no optional fields",
                rules: MediaTypePartsToLowerCaseRuleset,
                inputValue: "TEXT/HTML",
                expectedValue: "text/html",
            },
            {
                description: "normalises to lower case",
                rules: MediaTypePartsToLowerCaseRuleset,
                inputValue: "APPLICATION/VND.EXAMPLE+YAML; VERSION=3.0; SOURCE=\"application/JSON\"",
                expectedValue: "application/vnd.example+yaml; version=3.0; source=\"application/JSON\"",
            }
        ].forEach((ruleset) => {
            const { expectedValue, rules, description } = ruleset;
            it(description, () => {
                // we work with strings just because it's easier
                // to setup the test data
                const inputValue = parseMediaTypeData(ruleset.inputValue);
                const actualValue = makeMediaTypeDataFromMediaTypeParts(
                    formatMediaTypeParts(inputValue, rules)
                );

                expect(actualValue).to.equal(expectedValue);
            });
        });
    });
});