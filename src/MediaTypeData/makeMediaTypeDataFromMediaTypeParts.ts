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

import type { MediaTypeParts } from "../MediaTypeParts";
import { MediaTypeParamNeedsQuotingRegex } from "./regexes";

/**
 * `formatMediaTypeParts()` converts {@link MediaTypeParts} into a
 * RFC-compliant string.
 *
 * @category MediaTypeData
 * @param input
 * The input data to convert.
 * @returns
 * The RFC-compliant string.
 */
export function makeMediaTypeDataFromMediaTypeParts(
    input: MediaTypeParts
): string {
    let retval = "";
    if (input.type.length > 0) {
        retval = retval + input.type + "/";
    }
    if (input.tree) {
        retval = retval + input.tree + ".";
    }
    retval = retval + input.subtype;
    if (input.suffix && input.suffix.length > 0) {
        retval = retval + "+" + input.suffix;
    }

    if (input.parameters) {
        const paramsList = [];

        // tslint:disable-next-line: forin
        for(const paramKey in input.parameters) {
            // shorthand
            const paramValue = input.parameters[paramKey];

            let delimiter = "";
            if (MediaTypeParamNeedsQuotingRegex.test(paramValue)) {
                // eslint-disable-next-line quotes
                delimiter = '"';
            }
            paramsList.push(paramKey + "=" + delimiter + input.parameters[paramKey] + delimiter);
        }

        if (paramsList.length > 0) {
            retval = retval + "; " + paramsList.join("; ");
        }
    }

    return retval;
}