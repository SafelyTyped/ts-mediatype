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
import { FormatMediaTypePartsRules, FormatMediaTypePartsRuleset } from "./FormatMediaTypePartsRules";
import { MediaTypeParameters } from "./MediaTypeParameters";
import { MediaTypeParts } from "./MediaTypeParts";

/**
 * `isMediaTypeData()` is a data guard.
 *
 * @category MediaType
 * @param input
 * The input data to validate.
 * @returns
 * - `true` if `input` can be used to make a new {@link MediaType}
 * - `false` otherwise.
 */
export function formatMediaTypeParts(
    input: MediaTypeParts,
    ...rulesets: FormatMediaTypePartsRuleset[]
): MediaTypeParts {
    // this will be our return value
    //
    // we start with a clone, to make sure we don't change `input`
    // by accident!
    //
    // we don't need a deep clone here, because we rebuild the `.parameters`
    // as a new object anyways later on
    const retval = Object.assign({}, input);

    rulesets.forEach((ruleset) => {
        retval.subtype = applyRule(ruleset.rules, "subtype", retval.subtype);
        retval.type = applyRule(ruleset.rules, "type", retval.type);
        if (retval.tree) {
            retval.tree = applyRule(ruleset.rules, "tree", retval.tree);
        }
        if (retval.suffix) {
            retval.suffix = applyRule(ruleset.rules, "suffix", retval.suffix);
        }

        if (retval.parameters) {
            const newParameters: MediaTypeParameters = {};

            // tslint:disable-next-line: forin
            for (const parameterKey in retval.parameters) {
                // shorthand
                const paramKey = applyRule(ruleset.rules, "parameterKey", parameterKey);

                // has the formatter destroyed our parameter key?
                if (paramKey.trim().length === 0) {
                    continue;
                }

                // if we reach here, we want this parameter
                newParameters[paramKey]
                    = applyRule(ruleset.rules, "parameterValue", retval.parameters[parameterKey]);
            }

            retval.parameters = newParameters;
        }
    });

    // all done
    return retval;
}

function applyRule(
    ruleset: FormatMediaTypePartsRules,
    ruleName: keyof FormatMediaTypePartsRules,
    input: string
): string {
    // do we have a rule to apply?
    const rule = ruleset[ruleName];
    if (!rule) {
        return ruleset.default(input);
    }

    return rule(input);
}