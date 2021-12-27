# colab 

1. google drive에 파일 넣고
2. 연결 프로그램으로 google colab 실행 시키기 



### 코드 스피넷

좌측에 `< >`  모양 클릭해서 검색 후 삽입해서 사용가능 

![image-20211227112357234](README.assets/image-20211227112357234.png)

![image-20211227112407672](README.assets/image-20211227112407672.png)

### 캡쳐도 사용가능.. ㅎㅎ

cv2와 numpy matplotblib 를 이용해서 도형도 그릴 수 있다.

```python
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.widgets import RadioButtons

t = np.arange(0.0, 2.0, 0.01)
s0 = np.sin(2*np.pi*t)
s1 = np.sin(4*np.pi*t)
s2 = np.sin(8*np.pi*t)

fig, ax = plt.subplots()
l, = ax.plot(t, s0, lw=2, color='red')
plt.subplots_adjust(left=0.3)

axcolor = 'lightgoldenrodyellow'
rax = plt.axes([0.05, 0.7, 0.15, 0.15], facecolor=axcolor)
radio = RadioButtons(rax, ('2 Hz', '4 Hz', '8 Hz'))


def hzfunc(label):
    hzdict = {'2 Hz': s0, '4 Hz': s1, '8 Hz': s2}
    ydata = hzdict[label]
    l.set_ydata(ydata)
    plt.draw()
radio.on_clicked(hzfunc)

rax = plt.axes([0.05, 0.4, 0.15, 0.15], facecolor=axcolor)
radio2 = RadioButtons(rax, ('red', 'blue', 'green'))


def colorfunc(label):
    l.set_color(label)
    plt.draw()
radio2.on_clicked(colorfunc)

rax = plt.axes([0.05, 0.1, 0.15, 0.15], facecolor=axcolor)
radio3 = RadioButtons(rax, ('-', '--', '-.', 'steps', ':'))


def stylefunc(label):
    l.set_linestyle(label)
    plt.draw()
radio3.on_clicked(stylefunc)

plt.show()
```

![image-20211227114212049](README.assets/image-20211227114212049.png)



## 느낀점 

colab을 사용하는 법을 배웠다.생각보다 간단하게 사용 가능하지만,

어떤 라이브러리를 어떻게 사용하냐에 따라 쓸수 있는 기능이 달라질 것 같다. 

필요한 기능을 평소에 알아둬서 기록해두면 유용하게 사용 가능할 것으로 보인다.

