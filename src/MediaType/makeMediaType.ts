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
    applyFunctionalOptions,
    type FunctionalOption,
    type OnError,
    type OnErrorOptions,
    THROW_THE_ERROR,
} from "@safelytyped/core-types";

import { makeMediaTypeDataFromMediaTypeParts, parseMediaTypeData } from "../MediaTypeData";
import type { MediaTypeParts } from "../MediaTypeParts";
import { MAKE_MEDIA_TYPE_DEFAULT_FN_OPTS } from "./defaults/MAKE_MEDIA_TYPE_DEFAULT_FN_OPTS";
import { MediaType } from "./MediaType";

/**
 * `makeMediaType()` is a smart constructor. It verifies that the
 * `input` contains valid MediaType data, by calling
 * {@link mustBeMediaTypeData}.
 *
 * If there are no user-supplied functional options, we apply
 * {@link MAKE_MEDIA_TYPE_DEFAULT_FN_OPTS}. You'll probably want to pass
 * these in, if you supply your own functional options.
 *
 * @category MediaType
 * @param input
 * This is the data we'll use to create the new MediaType
 * @param onError
 * If `input` fails validation, we'll pass an {@link AppError} to this.
 * @param defaultFnOpts
 * If `fnOpts` is empty, we use these instead.
 * @param fnOpts
 * These are user-supplied functional options.
 * @returns
 * The new MediaType object.
 */
export const makeMediaType = (
    input: string,
    {
        onError = THROW_THE_ERROR,
        defaultFnOpts = MAKE_MEDIA_TYPE_DEFAULT_FN_OPTS
    }: {
        onError?: OnError,
        defaultFnOpts?: FunctionalOption<MediaTypeParts, OnErrorOptions>[]
    } = {},
    ...fnOpts: FunctionalOption<MediaTypeParts, OnErrorOptions>[]
): MediaType => {
    // special case - apply the default functional options
    if (fnOpts.length === 0) {
        fnOpts = defaultFnOpts;
    }

    // doing it this way avoids constant re-parsing of the input strings!
    const parts = applyFunctionalOptions(
        parseMediaTypeData(input, { onError }),
        { onError },
        ...fnOpts
    );

    // we need to turn this into something our MediaType class
    // will accept
    const finalInput = makeMediaTypeDataFromMediaTypeParts(parts);

    // all done (we hope!)
    return new MediaType(finalInput, { onError });
};