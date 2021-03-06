import styled from 'styled-components';

export const StyledRoadmap = styled.div`
    position: relative;
    align-self: center;
`;

export const StyledHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: -42px;
`;

export const StyledLogo = styled.img`
    width: 27px;
    height: 27px;

    ${({ theme }) => theme.mediaQueries.sm} {
        width: 45px;
        height: 45px;
    }
`;

export const StyledHeaderTitle1 = styled.img`
    width: 211px;
    height: 79px;
    margin-left: -25px;

    ${({ theme }) => theme.mediaQueries.sm} {
        width: 352px;
        height: 131px;
        margin-left: -25px;
    }
`;

export const StyledHeaderTitle2 = styled.img`
    width: 217;
    height: 79px;
    margin-left: -50px;
    margin-right: -55px;

    ${({ theme }) => theme.mediaQueries.sm} {
        width: 363px;
        height: 131px;
        margin-left: -10px;
        margin-right: -80px;
    }
`;

export const StyledHeaderText1 = styled.span`
    font-family: 'bladerunner', sans-serif;
    font-size: 25px;
    margin-left: 24px;
`;

export const StyledHeaderText2 = styled.span`
    font-family: 'bladerunner', sans-serif;
    font-size: 25px;
    margin-left: 80px;
`;

export const StyledHeaderSplitter = styled.div`
    border: 1px solid #707070;
    margin-top: 23px;
    margin-bottom: 26px;
`;

export const StyledContent = styled.div`
    padding-top: 30px;
    padding-right: 61px;
    padding-left: 9px;
    position: relative;
`

export const StyledRectIcon = styled.img`
    width: 18px;
    height: 21px;
    margin-right: 10px;

    ${({ theme }) => theme.mediaQueries.sm} {
        width: 31px;
        height: 36px;
        margin-right: 41px;
    }
`;

export const StyledRectNone = styled.div`
    width: 0px;
    height: 21px;
    margin-right: 10px;
    padding-left: 18px;

    ${({ theme }) => theme.mediaQueries.sm} {
        padding-left: 31px;
        height: 36px;
        margin-right: 41px;
    }
`;

export const StyledCircleIcon = styled.img`
    width: 24px;
    height: 23px;
    margin-right: 18px;

    ${({ theme }) => theme.mediaQueries.sm} {
        width: 40px;
        height: 39px;
        margin-right: 30px;
    }
`;

export const StyledSplitter = styled.div`
    position: absolute;
    top: 0px;
    left: 48px;
    border: 1px solid #707070;
    height: 100%;
    z-index: -1;

    ${({ theme }) => theme.mediaQueries.sm} {
        left: 100px;
    }
`;

export const StyledItem = styled.div`
    display: flex;
    align-items: flex-start;
    height: 100px;
`;

export const StyledTextContainer = styled.div`
    font-family: BrandonGrotesqueWeb-Medium;
    font-size: 15px;
    color: white;
    padding-top: 7px;

    ${({ theme }) => theme.mediaQueries.sm} {
        font-size: 21.5px;
    }
`;

export const StyledSpanPink = styled.a`
    color: #FF00FF;
`;

export const StyledSpanLink = styled.a`
    color: #FF00FF;
    text-decoration: underline !important;
`;