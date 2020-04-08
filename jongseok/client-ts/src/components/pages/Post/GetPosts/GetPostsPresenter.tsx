import React from 'react';
import styled, { css } from 'styled-components';
import MoreIcon from '../../../../assets/icons/more.svg';
import { IPostState } from '../../../../store/actions/v1/types';
import { mediaQueries } from '../../../../styles/mediaQuery';
import Icon from '../../../atoms/Icon';
import PostCard from '../../../molecules/PostCard';

interface Props {
  posts: IPostState['posts'];
  pageInfo: IPostState['pageInfo'];
  handleNextCursor: (cursor: string) => void;
  searchByTitle: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const GetPostsPresenter = ({
  posts,
  pageInfo,
  handleNextCursor,
  searchByTitle,
  handleSearchChange,
  handleSearchSubmit,
}: Props) => {
  if (posts.length === 0) return <Wrapper>포스트를 찾을 수 없습니다.</Wrapper>;

  return (
    <Wrapper>
      <SearchBar>
        <SearchInput
          value={searchByTitle}
          onChange={handleSearchChange}
          onKeyPress={handleSearchSubmit}
        />
      </SearchBar>
      <PostWrapper>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </PostWrapper>
      {pageInfo.nextPageCursor && (
        <ReFetchButton onClick={() => handleNextCursor(pageInfo.nextPageCursor)}>
          <Icon src={MoreIcon} size={40} />
        </ReFetchButton>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  * {
    font-family: 'Share', cursive;
  }
  margin-top: ${(props) => props.theme.space * 2}px;
`;

const SearchBar = styled.div`
  width: 100%;
  margin-bottom: ${(props) => props.theme.space * 3}px;
`;

const SearchInput = styled.input.attrs((props) => ({
  type: props.type || 'text',
  placeholder: '포스트를 검색합니다. ',
}))`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.base.grey};
  box-sizing: border-box;
  padding: ${({ theme }) => `${theme.space * 1.5}px`};
`;

const PostWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
  align-items: center;
  justify-content: center;
  ${mediaQueries('tablet')`
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 32px;
  `}
`;

const ReFetchButton = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: 16px 0;
  width: 100%;
  outline: none;
  margin: 16px 0;
  ${(props) => css`
    color: ${props.theme.colors.base.black};
  `}
`;

export default GetPostsPresenter;
