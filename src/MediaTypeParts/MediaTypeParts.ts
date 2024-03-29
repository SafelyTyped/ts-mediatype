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

import type { MediaTypeParameters } from "./MediaTypeParameters";

/**
 * `MediaTypeParts` is the structure of a {@link MediaType}
 *
 * call {@link parseMediaType} or {@link MediaType.parse} to get your
 * {@link MediaType} broken down
 *
 * @category MediaType
 */
export interface MediaTypeParts {
    /**
     * the 'text' in 'text/html' - everything before the first '/'
     */
    type: string;

    /**
     * the 'vnd' in 'application/vnd.ms-excel' - everything after
     * the first '/' and before the first '.'
     */
    tree?: string;

    /**
     * the 'html' in 'text/html',
     * or the 'ms-excel' in 'application/vnd.ms-excel'
     *
     * - everything after the 'type' and the 'tree'
     */
    subtype: string;

    /**
     * the 'json' in 'application/vnd.ms-excel+json'
     */
    suffix?: string;

    /**
     * any parameters tacked onto the end of the media type
     */
    parameters?: MediaTypeParameters;
}