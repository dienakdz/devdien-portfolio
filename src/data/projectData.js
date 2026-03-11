import project1 from '../assets/optimized/project1.webp';
import project2 from '../assets/optimized/project2.webp';

export const projectData = {
  en: [
    {
      title: 'Travela',
      summary:
        'A tour-booking product focused on reliable reservation flows, recommendation support, and easier admin operations.',
      problem:
        'The booking journey involved multiple steps, while operators needed better visibility into customer data and trip schedules.',
      solution:
        'Built a structured booking workflow with Laravel, MySQL, and Python-powered data handling for destination recommendation logic.',
      impact:
        'Created a backend foundation that is easier to extend for booking states, reporting, and future payment integrations.',
      tech: ['Laravel', 'PHP', 'Python', 'MySQL'],
      repoUrl: 'https://github.com/dienakdz/travela',
      liveUrl: null,
      status: 'Case study',
      image: project1,
    },
    {
      title: 'Veggie',
      summary:
        'An e-commerce platform for clean food retail with delivery integration and inventory-aware order management.',
      problem:
        'The store needed smoother order handling, shipping integration, and tighter coordination between catalog and stock data.',
      solution:
        'Implemented backend flows around product catalog, checkout, GHN delivery APIs, and inventory updates for day-to-day operations.',
      impact:
        'Improved the product structure for scaling commerce features while keeping operational data and shipping states in sync.',
      tech: ['Laravel', 'PHP', 'MySQL', 'GHN API'],
      repoUrl: 'https://github.com/dienakdz/veggie',
      liveUrl: null,
      status: 'Private demo',
      image: project2,
    },
  ],
  vi: [
    {
      title: 'Travela',
      summary:
        'Nền tảng đặt tour trực tuyến tập trung vào luồng booking rõ ràng, hỗ trợ gợi ý điểm đến và quản trị vận hành.',
      problem:
        'Quy trình đặt tour nhiều bước dễ rơi khách, trong khi phía vận hành cần theo dõi lịch trình và dữ liệu khách hàng tốt hơn.',
      solution:
        'Xây dựng workflow booking rõ trạng thái bằng Laravel, MySQL và lớp xử lý dữ liệu bằng Python cho logic gợi ý điểm đến.',
      impact:
        'Tạo nền backend đủ ổn định để mở rộng các tính năng booking, báo cáo vận hành và tích hợp thanh toán về sau.',
      tech: ['Laravel', 'PHP', 'Python', 'MySQL'],
      repoUrl: 'https://github.com/dienakdz/travela',
      liveUrl: null,
      status: 'Case study',
      image: project1,
    },
    {
      title: 'Veggie',
      summary:
        'Nền tảng e-commerce thực phẩm sạch với tích hợp vận chuyển và quản lý tồn kho bám sát quy trình bán hàng.',
      problem:
        'Website cần luồng đặt hàng mượt hơn, đồng bộ trạng thái giao hàng và kiểm soát tồn kho tốt hơn trong vận hành hàng ngày.',
      solution:
        'Thiết kế backend cho catalog, checkout, GHN delivery API và cập nhật tồn kho để dữ liệu đơn hàng nhất quán hơn.',
      impact:
        'Củng cố nền tảng kỹ thuật để mở rộng các tính năng thương mại điện tử mà vẫn giữ dữ liệu vận hành ổn định.',
      tech: ['Laravel', 'PHP', 'MySQL', 'GHN API'],
      repoUrl: 'https://github.com/dienakdz/veggie',
      liveUrl: null,
      status: 'Demo riêng tư',
      image: project2,
    },
  ],
};
