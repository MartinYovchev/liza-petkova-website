import Link from 'next/link';
import Image from 'next/image';
import { getImageUrl } from '../../lib/supabase';
import { BlogPost } from '../../lib/types';
import Title from '../Typography/Title';
import Text from '../Typography/Text';
import styles from './BlogCard.module.scss';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const coverImage = post.cover_image || post.images?.[0];
  const imageUrl = getImageUrl(coverImage as string | null);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <article className={styles.card}>
      {imageUrl && (
        <div className={styles.imageContainer}>
          <Image
            src={imageUrl || '/placeholder.svg'}
            alt={post.title}
            fill
            className={styles.image}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
          <div className={styles.imageOverlay} />
        </div>
      )}

      <div className={styles.content}>
        <Title level='h2' className={styles.title}>
          <Link href={`/blog/${post.slug}`} className={styles.titleLink}>
            {post.title}
          </Link>
        </Title>

        {post.excerpt && <Text className={styles.excerpt}>{post.excerpt}</Text>}

        {post.tags && post.tags.length > 0 && (
          <div className={styles.tags}>
            {post.tags.slice(0, 3).map(tag => (
              <Text key={tag} as='span' className={styles.tag}>
                {tag}
              </Text>
            ))}
          </div>
        )}

        <div className={styles.footer}>
          <Link href={`/blog/${post.slug}`} className={styles.readMore}>
            Read More
            <svg
              className={styles.arrow}
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </svg>
          </Link>

          {post.author_name && (
            <Text as='span' className={styles.author}>
              by {post.author_name}
            </Text>
          )}
        </div>
      </div>
    </article>
  );
}
