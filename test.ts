type TupleToUnion<T extends any[]> = T extends [infer L, ...infer R]
    ? R extends any[]
        ? L | TupleToUnion<R>
        : L
    : never;

type Foo = [string, number, boolean];
type Bar = TupleToUnion<Foo>;

type IsEmptyType<T> = T extends null | undefined | {} ? true : false;
type Test = IsEmptyType<string>;

type StrLength<T extends string, C extends any[] = []> = T extends ""
    ? C["length"]
    : T extends `${infer L}${infer R}`
      ? StrLength<R, ["", ...C]>
      : never;

type Test2 = StrLength<"asdasd ">;

type ReplaceAll<
    S extends string,
    F extends string,
    T extends string,
> = S extends `${infer L}${F}${infer R}` ? `${L}${T}${ReplaceAll<R, F, T>}` : S;

type Test3 = ReplaceAll<"bfe.dev", "", "-">;

// type IsBigger<A extends number, B extends number, L extends any[] = [], R extends any[] = []> =

type ToArray<N extends number, A extends any[] = []> = A["length"] extends N
    ? A
    : ToArray<N, ["", ...A]>;

type Slice<
    A extends any[],
    S extends number = 0,
    E extends number = A["length"],
    I extends any[] = ToArray<S>,
> = I["length"] extends E
    ? [] // end
    : I["length"] extends A["length"]
      ? [] // end
      : A[I["length"]] extends undefined
        ? []
        : [A[I["length"]], ...Slice<A, S, E, ["", ...I]>];

type Test4 = Slice<[1, 2, 3, 4], 0, 2>;
type E = Slice<[number, boolean, bigint], 5, 6>; // []

// type ToArray<N extends number, L extends any[] = []> = L['length'] extends N
//   ? L
//   : ToArray<N, ["", ...L]>

{
    type Divide<
        A extends number,
        B extends number,
        AL extends any[] = ToArray<A>,
        BL extends any[] = ToArray<B>,
        Result extends any[] = [],
    > = BL["length"] extends 0
        ? never
        : AL extends [...BL, ...infer AR]
          ? Divide<A, B, AR, BL, ["", ...Result]>
          : Result["length"];

    type A = Divide<1, 0>; // never
    type B = Divide<4, 2>; // 2
    type C = Divide<10, 3>; // 3
}

{
    type LargerThan<
        A extends number,
        B extends number,
        LA extends any[] = ToArray<A>,
        LB extends any[] = ToArray<B>,
    > = [...LA] extends [...LB, ...infer L]
        ? LA["length"] extends LB["length"]
            ? false
            : true
        : false;

    type AA = [""] extends ["", "", ...infer R] ? "extends" : "not";

    type A = LargerThan<3, 2>; // false
    type B = LargerThan<1, 0>; // true
    type C = LargerThan<10, 9>; // true

    type N<L extends any[]> = L["length"];

    // [3, 2, 1]
    // type Sort<
    //     T extends number[],
    //     L extends any[] = [],
    //     R extends any[] = [""],
    //     Result extends number[] = [],
    // > =
    //     T extends [infer A, infer B, ...infer C]
    //         ?
    // LargerThan<T[N<L>], T[N<R>]> extends true
    //     ? T extends [...infer LL, T[N<L>], T[N<R>], ...infer RR]
    //         ? [...LL, T[N<R>], T[N<L>], ...RR] extends number[]
    //             ? Sort<[...LL, T[N<R>], T[N<L>], ...RR], [], [""], Result> // sort from start
    //             : "1"
    //         : "2"
    //     : N<R> extends N<T>
    //       ? "3"
    //       : Sort<T, ["", ...L], ["", ...R], Result>;

    // type AAA = Sort<[3, 2]>;

    // type Z<T extends number[]> = T extends [infer A, infer B, ...infer R] ? R : never;
    // type ZZ = Z<[0, 1, 2, 3]>;
}

{
    type Includes<T extends readonly any[], U> = [...T] extends [U, ...infer R] ? true : false;

    type A = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Kars">;
}
