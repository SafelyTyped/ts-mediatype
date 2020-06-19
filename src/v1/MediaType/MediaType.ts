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

import {
    OnErrorOptions,
    RefinedString,
    THROW_THE_ERROR
} from "@safelytyped/core-types";

import { mustBeMediaTypeData } from "../MediaTypeData";
import { MediaTypeParts } from "../MediaTypeParts";
import { parseMediaTypeData } from "../MediaTypeData";

/**
 * `MediaType` is a safe type.
 *
 * @category MediaType
 */
export class MediaType extends RefinedString {
    /**
     * `#parsed` is an internal cache. It stops us having to parse our value
     * more than once.
     */
    #parsed: MediaTypeParts|undefined = undefined;

    /**
     * `Constructor` creates a new `MediaType`.
     *
     * @param input
     * The data we need to build a MediaType.
     * @param onError
     * If `input` fails validation, we pass an {@link AppError}
     * to `onError()`.
     */
    public constructor(
        input: string,
        {
            onError = THROW_THE_ERROR
        }: Partial<OnErrorOptions> = {}
    ) {
        super(mustBeMediaTypeData, input, { onError });
    }

    /**
     * `parse()` returns a breakdown of the individual components for
     * this media type.
     */
    public parse(): MediaTypeParts {
        // haven't we already done this?
        if (!this.#parsed) {
            // no, first time for everything!
            this.#parsed = parseMediaTypeData(this._value);
        }

        // return our cached value
        return this.#parsed;
    }
}