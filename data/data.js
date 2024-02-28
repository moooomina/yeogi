import data from "./accommodation.js"

// type 걸러주는 필터
export function getAccommodationsByType(types, src){
    return src.filter(
        e => types.every(
            type => e.type === type
        )
    )
    /* return src.filter((e)=>{ 근데 보통 소괄호는 남겨놓는다고 함
        return e.type === type 
    }) */
}

// 할인혜택 걸러주는 필터
export function getAccommodationsByDiscountBenefits(benefits, src) { // 
    return src.filter( // data 배열에 있는 object를 하나씩 e 매개변수에 넣어주고 true를 반환하는 값만 추가
        e => benefits.every( // benefits 배열에 있는 문자열을 benefit에 가져올건데 모든 원소에서 true가 return되면 결과로 true를 리턴
            benefit => e.discount_benefit.includes(benefit) // discount_benefit 안에 benefit이 있는지 확인
        )
    );
}
// #취향 걸러주는 필터
export function getAccommodationsByTags(tags, src) {
    return src.filter(
        e => tags.every(
            tag => e.tag.includes(tag)
        )
    );
}
// 등급 걸러주는 필터
export function getAccommodationsByRanks(ranks, src) { 
    return src.filter( 
        e => ranks.every(
            rank => e.rank === rank
        )
    );
}
// 공용시설 필터
export function getAccommodationsByFacilityPublics(facility_publics, src) { 
    return src.filter( 
        e => facility_publics.every(
            facility_public => e.facility_public.includes(facility_public)
        )
    );
}
// 객실 내 시설 필터
export function getAccommodationsByFacilityInsides(facility_insides, src) { 
    return src.filter( 
        e => facility_insides.every(
            facility_inside => e.facility_inside.includes(facility_inside)
        )
    );
}
// 기타시설 필터
export function getAccommodationsByFacilityEtcs(facility_etcs, src) { 
    return src.filter( 
        e => facility_etcs.every(
            facility_etc => e.facility_etc.includes(facility_etc)
        )
    );
}

export function getAccommodationsByEveryFilter({ 
    type = [], benefits = [], tags = [], ranks = [],
    facility_publics = [], facility_insides = [], facility_etcs = [],
}) {
    const filterFunctions = [
        getAccommodationsByType,
        getAccommodationsByDiscountBenefits,
        getAccommodationsByTags,
        getAccommodationsByRanks,
        getAccommodationsByFacilityPublics,
        getAccommodationsByFacilityInsides,
        getAccommodationsByFacilityEtcs,
    ];

    const filterValues = [
        type,
        benefits,
        tags,
        ranks,
        facility_publics,
        facility_insides,
        facility_etcs,
    ]

    let result = data;
    for (let i = 0; i < filterFunctions.length; i++) {
        if (!filterValues[i].length) continue;
        result = filterFunctions[i](filterValues[i], result);
    }

    return result;
}
