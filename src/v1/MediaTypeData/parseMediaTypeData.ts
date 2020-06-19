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
import {
    applyFunctionalOptions,
    DataPath,
    DEFAULT_DATA_PATH,
    FunctionalOption,
    HashMap,
    OnError,
    THROW_THE_ERROR,
} from "@safelytyped/core-types";

import { InvalidMediaTypeDataError, MediaTypeMatchRegexIsBrokenError } from "../Errors";
import { MediaTypeParts } from "../MediaType/MediaTypeParts";
import { MediaTypeMatchRegex, MediaTypeParamRegex } from "./regexes";

/**
 * `parseMediaTypeData()` is a data parser. It breaks down an RFC-compliant
 * media type into its individual parts.
 *
 * @category MediaTypeData
 */
export function parseMediaTypeData(
    input: string,
    {
        onError = THROW_THE_ERROR,
        path = DEFAULT_DATA_PATH,
        matchRegex = MediaTypeMatchRegex,
        paramRegex = MediaTypeParamRegex
    }: {
        onError?: OnError,
        path?: DataPath,
        matchRegex?: RegExp,
        paramRegex?: RegExp,
    } = {},
    ...fnOpts: FunctionalOption<MediaTypeParts>[]
): MediaTypeParts {
    const regResult = matchRegex.exec(input);
    if (regResult === null) {
        throw onError(new InvalidMediaTypeDataError({
            public: {
                dataPath: path,
                input
            }
        }));
    }

    // special case - the regex has no named groups in it any more
    // this code is unreachable for testing purposes :(
    if (regResult.groups === undefined) {
        throw onError(new MediaTypeMatchRegexIsBrokenError({}));
    }

    // these, we can get from our first regex
    const retval: MediaTypeParts = {
        type: regResult.groups.type,
        subtype: regResult.groups.subtype,
    }

    // these may not exist
    if (regResult.groups.tree) {
        retval.tree = regResult.groups.tree;
    }
    if (regResult.groups.suffix) {
        retval.suffix = regResult.groups.suffix;
    }

    // the parameters need a different approach
    const parameters = parseMediaTypeParameters(paramRegex, input);
    if (parameters) {
        retval.parameters = parameters;
    }

    // all done
    return applyFunctionalOptions(retval, { onError, path }, ...fnOpts);
}

function parseMediaTypeParameters(
    paramRegex: RegExp,
    input: string
): HashMap<string>|undefined {
    // our return value
    const retval: HashMap<string> = {};

    // what do we have?
    let paramResult = paramRegex.exec(input);
    if (paramResult === null) {
        return undefined;
    }

    while (paramResult !== null && paramResult.groups !== undefined) {
        const paramName = paramResult.groups.parameterName;
        retval[paramName]
            = paramResult.groups.parameterValueA || paramResult.groups.parameterValueB;

        paramResult = paramRegex.exec(input);
    }

    // all done
    return retval;
}