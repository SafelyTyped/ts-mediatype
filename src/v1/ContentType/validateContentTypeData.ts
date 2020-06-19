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

import { AppErrorOr, DataPath } from "@safelytyped/core-types";

import { ContentType } from "./ContentType";
import { InvalidContentTypeError } from "../Errors";
import { ContentTypeMatchRegex } from "../MediaType";

/**
 * `validateContentTypeData()` is a {@link DataValidator}. Use it to
 * prove that the given input is a legal input value for
 * {@link makeContentType}
 *
 * @param path
 * where are we in the data structure that you are validating?
 * @param input
 * the value to validate
 * @returns
 * - `input` (type-cast to ContentType) if validation succeeds, or
 * - an `AppError` explaining why validation failed
 *
 * @category ContentType
 */
export function validateContentTypeData (
    path: DataPath,
    input: string
): AppErrorOr<ContentType> {
    // add your validation code in here
    //
    // this is an example for you to replace ...
    if (!ContentTypeMatchRegex.test(input)) {
        return new InvalidContentTypeError({
            public: {
                dataPath: path,
                input: input
            }
        });
    }

    // all done
    return input as ContentType;
}