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
    type FunctionalOption,
    makeNominalType,
    type OnErrorOptions,
    type SmartConstructor,
    THROW_THE_ERROR,
    DEFAULT_DATA_PATH,
    type TypeGuaranteeOptions,
} from "@safelytyped/core-types";

import { mustBeContentTypeData } from "./mustBeContentTypeData";
import type { ContentType } from "./ContentType";

/**
 * `makeContentType()` is a smart constructor. It verifies that the
 * `input` contains valid ContentType data, by calling
 * {@link mustBeContentTypeData}.
 *
 * @category ContentType
 * @param input
 * @param onError
 * @param fnOpts
 * @returns
 * The validated input, as a ContentType type.
 */
export const makeContentType: SmartConstructor<string, ContentType, OnErrorOptions, string | ContentType> = (
    input: string,
    {
        path = DEFAULT_DATA_PATH,
        onError = THROW_THE_ERROR
    }: Partial<TypeGuaranteeOptions> = {},
    ...fnOpts: FunctionalOption<string | ContentType, OnErrorOptions>[]
): ContentType => makeNominalType<string, ContentType, TypeGuaranteeOptions>(
    mustBeContentTypeData,
    input,
    { onError },
    ...fnOpts
);